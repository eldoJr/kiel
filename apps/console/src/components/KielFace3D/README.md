# KIEL Face 3D - Model Setup

## Using Proper Head Topology

### Option 1: Download Free Models

**Sketchfab** (CC License models):
1. Visit: https://sketchfab.com/search?q=human+head+topology&type=models
2. Filter by "Downloadable" and "Free"
3. Download as `.glb` or `.gltf`
4. Place in `apps/console/public/models/head.glb`

**Poly Haven**:
1. Visit: https://polyhaven.com/
2. Search for head/face models
3. Download `.glb` format
4. Place in `apps/console/public/models/head.glb`

### Option 2: Create Custom Model

**Blender + FaceBuilder**:
1. Install Blender
2. Install FaceBuilder plugin
3. Create low-poly head topology
4. Export as `.glb`
5. Place in `apps/console/public/models/head.glb`

### Usage

Uncomment in `index.tsx`:
```tsx
<HeadModel modelPath="/models/head.glb" />
```

### Current Setup

Using wireframe sphere (32x32 segments) as placeholder until proper model is added.
