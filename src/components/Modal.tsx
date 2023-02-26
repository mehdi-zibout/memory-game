import { Accessor, JSX, Setter } from "solid-js";
import { Portal, Show } from "solid-js/web";
import { Card } from "./UIBasics";

function Modal(props: ModalProps) {
  return (
    <Show when={props.isVisible()}>
      <Portal>
        <div
          onclick={() => props.showModal(false)}
          class="fixed z-40 top-0 left-0 w-screen h-screen flex justify-center items-center bg-[#000] bg-opacity-50 text-white p-6"
        >
          <Card
            onclick={(e) => e.stopPropagation()}
            class={props?.cardClass ?? ""}
          >
            {props.children}
          </Card>
        </div>
      </Portal>
    </Show>
  );
}

export default Modal;

type ModalProps = {
  cardClass?: string;
  isVisible: Accessor<boolean>;
  showModal: Setter<boolean>;
  children: JSX.Element;
};
