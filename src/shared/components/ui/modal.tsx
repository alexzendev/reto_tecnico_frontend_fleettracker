import {
  FloatingFocusManager,
  FloatingOverlay,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const { context, refs } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, {
    enabled: false,
    outsidePressEvent: "mousedown",
  });
  const role = useRole(context);

  const { getFloatingProps } = useInteractions([click, dismiss, role]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.dataset.scrollDisabled = "true";
    } else {
      delete document.documentElement.dataset.scrollDisabled;
    }

    return () => {
      delete document.documentElement.dataset.scrollDisabled;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <FloatingOverlay
      lockScroll={true}
      className="bg-black/50 flex items-center justify-center z-50 md:p-4 p-2"
    >
      <FloatingFocusManager context={context}>
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          className={`outline-none bg-stone-50 dark:bg-stone-900 rounded-lg ${className}`}
        >
          <div className="flex items-center justify-end border-b border-stone-200 dark:border-stone-700">
            <button
              onClick={() => onClose(false)}
              className="flex items-center justify-center md:p-2 p-1.5 hover:text-red-600 transition-colors duration-200 cursor-pointer outline-none"
              aria-label="Cerrar modal"
            >
              <X className="size-6" />
            </button>
          </div>

          <div>{children}</div>
        </div>
      </FloatingFocusManager>
    </FloatingOverlay>
  );
};
