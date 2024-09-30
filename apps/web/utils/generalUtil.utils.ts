export function extractInitials(value?: string) {
  return value?.charAt(0).toUpperCase();
}

export function filterFileUpload(item: string[], index: number) {
  return item.filter((_, i: number) => i !== index);
}