import { extendMaterial } from './extendMaterial'
import { MeshPhongMaterial, TextureLoader } from 'three'
import noise2 from './shaders/chunks/noise2'
import aastep from './shaders/chunks/aastep'
import fade from './shaders/chunks/fade'

export const TattooMaterial = () => {
    const tattooTexture = new TextureLoader().load('/images/tattoo-sdf.png')
    const normalTexture = new TextureLoader().load('/images/skin-2-normals.png')

    const output = extendMaterial(MeshPhongMaterial, {
        uniforms: {
            time: 0.0,
            map: tattooTexture,
            normalMap: normalTexture,
        },
        material: {
            transparent: true,
        },
        fragment: {
            'uniform float opacity;': 'uniform float time;',
            '#include <clipping_planes_pars_fragment>': noise2 + aastep + fade,
            '#include <map_fragment>': `vec4 texColor = texture2D(map, vUv);
            float dist = texColor.a;
            float alpha = 0.;
            alpha = selectInk(1, dist, vUv);
            diffuseColor.rgb = texColor.rgb;
            diffuseColor.a = alpha;`,
        },
    })
    return output
}
