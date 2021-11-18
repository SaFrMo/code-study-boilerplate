import { extendMaterial } from './extendMaterial'
import { MeshPhongMaterial, TextureLoader } from 'three'
import noise2 from './shaders/chunks/noise2'
import aastep from './shaders/chunks/aastep'
import fade from './shaders/chunks/fade'

export const TattooMaterial = () => {
    const tattooTexture = new TextureLoader().load('/images/tattoo-sdf.png')

    // import fragmentShader from './shaders/fragment.glsl'

    /*
TattooMaterial({
            uniforms: {
                time: { value: 0.0 },
                tattooMap: { value: tattooTexture },
                bgDiffuse: { value: diffuseTexture },
                bgNormals: { value: normalTexture },
                bgSpecular: { value: specTexture },
            },
            transparent: true,
            vertexShader,
            fragmentShader,
        })
        */
    const output = extendMaterial(MeshPhongMaterial, {
        uniforms: {
            time: 0.0,
            map: tattooTexture,
        },
        material: {
            transparent: true,
        },
        fragment: {
            'uniform float opacity;': 'uniform float time;',
            '#include <clipping_planes_pars_fragment>': noise2 + aastep + fade,
        },
    })
    return output
}
