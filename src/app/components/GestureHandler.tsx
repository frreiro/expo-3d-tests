import {GestureDetector, GestureHandlerRootView, Gesture} from 'react-native-gesture-handler'
import Animated , {useSharedValue}from 'react-native-reanimated'
import {Canvas} from '@react-three/fiber'
import { Suspense } from 'react';
import Shoe from './Model';


export default function GestureHandler(children){
	const isPressed = useSharedValue(false);
	const offset = useSharedValue({ x: 0, y: 0 });

	const start = useSharedValue({ x: 0, y: 0 });
	const gesture = Gesture.Pan()
	  .onBegin(() => {
		isPressed.value = true;
	  })
	  .onUpdate((e) => {
		offset.value = {
		  x: e.translationX + start.value.x,
		  y: e.translationY + start.value.y,
		};
	  })
	  .onEnd(() => {
		start.value = {
		  x: offset.value.x,
		  y: offset.value.y,
		};
	  })
	  .onFinalize(() => {
		isPressed.value = false;
	  });


  return (
	<GestureHandlerRootView style={{ flex: 1 }}>
		<GestureDetector gesture={gesture}>
			<Animated.View style={{ flex: 1 }}>
			<Canvas>
				<ambientLight/>
				<pointLight position={[10,10,10]}/>
				<Suspense fallback={null}>
					<Shoe offset={offset}/>
				</Suspense>
			</Canvas>
			</Animated.View>
		</GestureDetector>
	</GestureHandlerRootView>
  );
}

