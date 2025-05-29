export const captureMetadata = async () => {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();
    return {
      ip,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to capture metadata:', error);
    return {
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };
  }
};

export const addPredictionMetadata = async <T extends object>(prediction: T) => {
  const metadata = await captureMetadata();
  return {
    ...prediction,
    id: `pred_${Date.now()}`,
    metadata,
    timestamp: metadata.timestamp,
  };
};
