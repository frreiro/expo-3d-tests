import {Canvas} from '@react-three/fiber'
import { Suspense } from 'react';
import GestureHandler from './GestureHandler';
import Shoe from './Model';


export default function Scene() {
  return (
	<GestureHandler>
		<Canvas>
			<ambientLight/>
			<pointLight position={[10,10,10]}/>
			<Suspense fallback={null}>
				<Shoe/>
			</Suspense>
		</Canvas>
	</GestureHandler>
  );
}