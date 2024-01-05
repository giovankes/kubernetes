export function format(name, pod, type) {
  if (type === 'vs') {
    return {
      metadata: {
        name: name.metadata.name,
      },
      data: {
        ...pod.data,
      },
    };
  }
}
