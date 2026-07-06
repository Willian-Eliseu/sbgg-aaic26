import { ref, readonly } from 'vue'

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertOptions {
  title: string;
  message: string;
  type?: AlertType;
  isConfirm?: boolean;
}

const isOpen = ref<boolean>(false);
const options = ref<AlertOptions>({
  title: '',
  message: '',
  type: 'info',
  isConfirm: false
});

let resolvePromise: (value: boolean) => void

export const useAlert = () => {
  const showAlert = (config: AlertOptions): Promise<boolean> => {
    if (!import.meta.client) return Promise.resolve(false)

    options.value = {
      ...config,
      type: config.type || 'info',
      isConfirm: config.isConfirm || false
    }
    
    isOpen.value = true

    return new Promise((resolve) => {
      resolvePromise = resolve
    })
  }

  const close = (response: boolean) => {
    isOpen.value = false
    if (resolvePromise) resolvePromise(response)
  }

  return {
    isOpen: readonly(isOpen),
    options: readonly(options),
    showAlert,
    close
  }
}