import {GestureDetector, GestureHandlerRootView, Gesture} from 'react-native-gesture-handler'
import Animated , {useSharedValue}from 'react-native-reanimated'
import {Canvas} from '@react-three/fiber'
import { Suspense } from 'react';
import Model from './Model';


export default function GestureHandler(){
	const isPressed = useSharedValue(false);
	const offset = useSharedValue({ x: 0, y: 0 });

	const startPan = useSharedValue({ x: 0, y: 0 });
	const panGesture = Gesture.Pan()
	  .onBegin(() => {
		isPressed.value = true;
	  })
	  .onUpdate((e) => {
		offset.value = {
		  x: e.translationX + startPan.value.x,
		  y: e.translationY + startPan.value.y,
		};
	  })
	  .onEnd(() => {
		startPan.value = {
		  x: offset.value.x,
		  y: offset.value.y,
		};
	  })
	  .onFinalize(() => {
		isPressed.value = false;
	  });

	const zoom = useSharedValue(10);
	const startZoom = useSharedValue(0);

	const pintchGesture = Gesture.Pinch()
	  .onBegin(() => {
		isPressed.value = true;
	  })
	  .onStart((e)=> {
		zoom.value = startZoom.value;
	  })
	  .onUpdate((e) => {
		zoom.value = e.scale * 10;
	  })
	  .onEnd(() => {
		startZoom.value = zoom.value
	  })
	  .onFinalize(() => {
		isPressed.value = false;
	  });

	  const composed = Gesture.Simultaneous(panGesture, pintchGesture)

  return (
	<GestureHandlerRootView style={{ flex: 1 }}>
		<GestureDetector gesture={composed}>
			<Animated.View style={{ flex: 1 }}>
			<Canvas>
				<ambientLight/>
				<pointLight position={[10,10,10]}/>
				<Suspense fallback={null}>
					<Model offset={offset} zoom={zoom}/>
				</Suspense>
			</Canvas>
			</Animated.View>
		</GestureDetector>
	</GestureHandlerRootView>
  );
}

