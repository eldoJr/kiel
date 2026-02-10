import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface KielFace3DProps {
  status?: 'idle' | 'listening' | 'thinking' | 'speaking';
}

export default function KielFace3D({ status = 'idle' }: KielFace3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { effectiveTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cx = () => canvas.width / 2;
    const cy = () => canvas.height / 2;
    
    const grid: Array<{ x: number; y: number; z: number; baseZ: number }> = [];
    const rings: Array<{ radius: number; speed: number; offset: number; particles: number }> = [];

    for (let i = 0; i < 80; i++) {
      for (let j = 0; j < 80; j++) {
        const x = (i - 40) * 15;
        const y = (j - 40) * 15;
        const dist = Math.sqrt(x * x + y * y);
        if (dist < 600) {
          grid.push({ x, y, z: 0, baseZ: Math.random() * 20 });
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      rings.push({
        radius: 100 + i * 40,
        speed: 0.001 + i * 0.0005,
        offset: (i * Math.PI) / 2,
        particles: 60 + i * 20
      });
    }

    let time = 0;
    let animationId: number;

    const animate = () => {
      ctx.fillStyle = effectiveTheme === 'light' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = cx();
      const centerY = cy();
      const speed = status === 'idle' ? 0.015 : status === 'listening' ? 0.03 : status === 'thinking' ? 0.025 : 0.04;

      grid.forEach((point) => {
        const dist = Math.sqrt(point.x * point.x + point.y * point.y);
        point.z = Math.sin(dist * 0.02 - time * 2) * 30 + point.baseZ;
        
        const scale = 1 + point.z / 200;
        const x = centerX + point.x * scale;
        const y = centerY + point.y * scale;
        const opacity = Math.max(0, 0.3 - dist / 2000);
        
        ctx.fillStyle = effectiveTheme === 'light' ? `rgba(100, 100, 200, ${opacity})` : `rgba(100, 100, 255, ${opacity})`;
        ctx.fillRect(x, y, 1, 1);
      });

      rings.forEach((ring) => {
        const particleCount = ring.particles;
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + time * ring.speed + ring.offset;
          const wave = Math.sin(angle * 3 + time * 2) * 10;
          const r = ring.radius + wave;
          const x = centerX + Math.cos(angle) * r;
          const y = centerY + Math.sin(angle) * r;
          
          const opacity = 0.4 + Math.sin(angle + time) * 0.3;
          const hue = 200 + Math.sin(angle) * 60;
          ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const coreSize = 80;
      const pulse = coreSize + Math.sin(time * 3) * (status === 'idle' ? 5 : 15);
      
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulse);
      if (effectiveTheme === 'light') {
        gradient.addColorStop(0, status === 'listening' ? 'rgba(34, 211, 238, 0.9)' : 
                                  status === 'thinking' ? 'rgba(139, 92, 246, 0.9)' : 
                                  status === 'speaking' ? 'rgba(236, 72, 153, 0.9)' : 
                                  'rgba(100, 100, 200, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        gradient.addColorStop(0, status === 'listening' ? 'rgba(34, 211, 238, 0.8)' : 
                                  status === 'thinking' ? 'rgba(139, 92, 246, 0.8)' : 
                                  status === 'speaking' ? 'rgba(236, 72, 153, 0.8)' : 
                                  'rgba(100, 100, 255, 0.6)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulse, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 3; i++) {
        const ringRadius = pulse + 20 + i * 15;
        const ringOpacity = 0.3 - i * 0.1;
        ctx.strokeStyle = status === 'listening' ? `rgba(34, 211, 238, ${ringOpacity})` : 
                          status === 'thinking' ? `rgba(139, 92, 246, ${ringOpacity})` : 
                          status === 'speaking' ? `rgba(236, 72, 153, ${ringOpacity})` : 
                          `rgba(100, 100, 255, ${ringOpacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      time += speed;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [status, effectiveTheme]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
