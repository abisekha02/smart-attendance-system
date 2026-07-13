import React, { useState, useRef } from 'react';
import { Camera, X, CheckCircle, MapPin } from 'lucide-react';

interface AttendanceCaptureProps {
  onCapture: (imageData: string, location: { latitude: number; longitude: number }) => void;
  onCancel: () => void;
}

const AttendanceCapture: React.FC<AttendanceCaptureProps> = ({ onCapture, onCancel }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Mock webcam implementation for demo purposes
  const takePicture = () => {
    // In a real app, this would get an actual image from webcam
    const mockImageUrl = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    setCapturedImage(mockImageUrl);
    setIsCameraActive(false);
  };
  
  const getLocation = () => {
    setLocationError(null);
    
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    
    // For the demo, we'll use mock coordinates
    setTimeout(() => {
      setLocation({
        latitude: 40.7128,
        longitude: -74.0060
      });
      setShowConfirmation(true);
    }, 1000);
    
    // In a real app, we would use the following code:
    /*
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setShowConfirmation(true);
      },
      (error) => {
        setLocationError(`Error getting location: ${error.message}`);
      }
    );
    */
  };
  
  const resetCamera = () => {
    setCapturedImage(null);
    setIsCameraActive(true);
    setShowConfirmation(false);
  };
  
  const confirmAttendance = () => {
    if (capturedImage && location) {
      onCapture(capturedImage, location);
    }
  };
  
  React.useEffect(() => {
    if (capturedImage) {
      getLocation();
    }
  }, [capturedImage]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {showConfirmation ? 'Confirm Attendance' : 'Capture Attendance Photo'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          {showConfirmation ? (
            <div className="space-y-4">
              {capturedImage && (
                <div className="relative">
                  <img 
                    src={capturedImage} 
                    alt="Captured image" 
                    className="w-full h-64 object-cover rounded-lg" 
                  />
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={resetCamera}
                      className="bg-white p-2 rounded-full shadow-md"
                    >
                      <Camera className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
              
              {location && (
                <div className="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Your Location</p>
                    <p className="text-xs text-gray-500">
                      Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      123 Business Center, New York, NY 10001
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={resetCamera}
                  className="btn btn-outline"
                >
                  Retake Photo
                </button>
                <button
                  onClick={confirmAttendance}
                  className="btn btn-primary"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Confirm Check-In
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {isCameraActive ? (
                <div className="relative bg-gray-100 rounded-lg aspect-video flex flex-col items-center justify-center">
                  <Camera className="h-16 w-16 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Camera preview would appear here</p>
                  <p className="text-gray-400 text-xs mt-1">Please ensure your face is clearly visible</p>
                </div>
              ) : (
                capturedImage && (
                  <div>
                    <img 
                      src={capturedImage} 
                      alt="Captured image" 
                      className="w-full h-64 object-cover rounded-lg" 
                    />
                  </div>
                )
              )}
              
              {locationError && (
                <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-md text-sm">
                  {locationError}
                </div>
              )}
              
              {isCameraActive && (
                <div className="flex justify-end">
                  <button
                    onClick={takePicture}
                    className="btn btn-primary"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCapture;