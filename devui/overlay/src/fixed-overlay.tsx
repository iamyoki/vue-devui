import { PropType } from 'vue';
import { computed, reactive } from 'vue';
import { defineComponent, ref, renderSlot, CSSProperties, toRef } from 'vue';
import { CommonOverlay } from './common-overlay';
import { overlayProps } from './overlay-types';
import './overlay.scss';
import { useOverlayLogic } from './utils';

export const FixedOverlay = defineComponent({
  name: 'DFixedOverlay',
  props: {
    ...overlayProps,
    overlayStyle: {
      type: Object as PropType<CSSProperties>
    },
  },
  setup(props, ctx) {
    const { containerClass, panelClass, handleBackdropClick } = useOverlayLogic(props);

    const overlayRef = ref<HTMLDivElement | null>(null);
    const handleBubbleCancel = (event: Event) => event.cancelBubble = true;

    return () => (
      <CommonOverlay>
        <div
          v-show={props.visible}
          class={containerClass}
        >
          <div
            class={panelClass}
            style={{ position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', display: 'flex' }}
            onClick={handleBackdropClick}
          >
            <div
              ref={overlayRef}
              class="d-overlay"
              style={props.overlayStyle}
              onClick={handleBubbleCancel}
            >
              {renderSlot(ctx.slots, 'default')}
            </div>
          </div>
        </div>
      </CommonOverlay>
    );
  }
});
