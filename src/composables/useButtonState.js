import { computed } from "vue";
import { useDocumentStore } from "@/stores/useDocumentStore";

export function useButtonState() {
  const documentStore = useDocumentStore();
  const isContinueButtonDisabled = computed(() => documentStore.isDisabled);

  return {
    isContinueButtonDisabled,
  };
}
