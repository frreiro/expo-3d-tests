import {useFrame, useLoader} from '@react-three/fiber'
import {  useRef, useLayoutEffect } from 'react';


import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { THREE, TextureLoader } from 'expo-three';
import { Mesh } from 'three';


export default function Model(props) {


	const meshRef = useRef<Mesh>();

	const material = useLoader(MTLLoader,require('../../../assets/Airmax/shoe.mtl')) as MTLLoader.MaterialCreator
	const obj = useLoader(OBJLoader,require('../../../assets/Airmax/shoe.obj'), 
	(loader) => {
		material.preload();
		loader.setMaterials(material);
	  }
	) as THREE.Group;

	// @ts-ignore
	const [base, normal, rough] = useLoader(TextureLoader, [
		require('../../../assets/Airmax/textures/BaseColor.jpg'),
		require('../../../assets/Airmax/textures/Normal.jpg'),
		require('../../../assets/Airmax/textures/Roughness.png'),
	  ]);

	useLayoutEffect(() => {
		obj.traverse((child) => {
		  if (child instanceof THREE.Mesh) {
			child.material.map = base;
			child.material.normalMap = normal;
			child.material.roughnessMap = rough;
		  }
		});
	  }, [obj]);


	useFrame((state, delta) => {
		const x = (props.offset.value.x * 100) / 5000;
		const y = (props.offset.value.y * 100) / 5000;

		meshRef.current.rotation.x = y;
		meshRef.current.rotation.y = x;
		meshRef.current.scale.setScalar(props.zoom.value)
	})

	return (
	<mesh ref={meshRef} rotation={[0.5,0,0]}>
		<primitive object={obj}/>
	</mesh>) 
  }





