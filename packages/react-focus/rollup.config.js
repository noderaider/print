import jsx from 'rollup-plugin-jsx'
import buble from 'rollup-plugin-buble'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default (
  { entry: 'src/index.js'
  , dest: 'dist/bundle.js'
  , format: 'umd'
  , moduleName: require('./package.json').name.split('-').map((x, i) => i === 0 ? x : `${x[0]}${x.slice(1)}`).join('')
  , external: [ 'react', 'react-dom' ]
  , plugins:  [ jsx({ factory: 'React.createElement' })
              , buble()
              , cjs({ include: 'node_modules/**' })
              , globals()
              , replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
              , resolve({ jsnext: true, main: true })
              ]
  }
)
