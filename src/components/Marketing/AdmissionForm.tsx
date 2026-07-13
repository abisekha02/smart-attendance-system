import React from 'react';
import { UserPlus, User, Mail, Phone, BookOpen, Calendar, MapPin, DollarSign } from 'lucide-react';
import { MOCK_CENTERS, MOCK_COURSES, MOCK_BATCHES } from '../../data/mockData';

const AdmissionForm: React.FC = () => {
  const [formStep, setFormStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    courseId: '',
    batchId: '',
    centerId: '',
    paymentMethod: 'cash',
    initialPayment: '',
  });
  
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'courseId') {
      setSelectedCourse(value);
      setFormData(prev => ({ ...prev, batchId: '' }));
    }
  };
  
  const nextStep = () => {
    setFormStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data
    alert('Admission form submitted successfully!');
    console.log(formData);
  };
  
  const availableBatches = MOCK_BATCHES.filter(
    batch => batch.courseId === formData.courseId && ['active', 'upcoming'].includes(batch.status)
  );
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">New Admission</h1>
      </div>
      
      <div className="card p-6">
        <div className="mb-8">
          <div className="flex items-center">
            <div className="flex-1 flex">
              <div className={`flex-1 border-t-2 ${formStep >= 1 ? 'border-primary-500' : 'border-gray-200'}`}></div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              formStep >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            } transition-colors duration-200`}>
              1
            </div>
            <div className="flex-1 flex">
              <div className={`flex-1 border-t-2 ${formStep >= 2 ? 'border-primary-500' : 'border-gray-200'}`}></div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              formStep >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            } transition-colors duration-200`}>
              2
            </div>
            <div className="flex-1 flex">
              <div className={`flex-1 border-t-2 ${formStep >= 3 ? 'border-primary-500' : 'border-gray-200'}`}></div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              formStep >= 3 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-500'
            } transition-colors duration-200`}>
              3
            </div>
            <div className="flex-1 flex">
              <div className={`flex-1 border-t-2 ${formStep >= 4 ? 'border-primary-500' : 'border-gray-200'}`}></div>
            </div>
          </div>
          <div className="flex text-sm mt-2">
            <div className="flex-1 text-center">Personal Details</div>
            <div className="flex-1 text-center">Course Selection</div>
            <div className="flex-1 text-center">Payment Details</div>
            <div className="flex-1 text-center">Confirmation</div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Details */}
          {formStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="form-input pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="form-label">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="form-input pl-10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="col-span-2 md:col-span-2">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="form-label">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="form-label">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                    className="form-input pl-10"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next: Course Selection
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Course Selection */}
          {formStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Course Selection</h2>
              </div>
              
              <div>
                <label htmlFor="centerId" className="form-label">Training Center</label>
                <select
                  id="centerId"
                  name="centerId"
                  value={formData.centerId}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select a center</option>
                  {MOCK_CENTERS.map(center => (
                    <option key={center.id} value={center.id}>
                      {center.name} - {center.city}, {center.state}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="courseId" className="form-label">Course</label>
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="">Select a course</option>
                  {MOCK_COURSES.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.name} - {course.duration} - ${course.fee}
                    </option>
                  ))}
                </select>
              </div>
              
              {formData.courseId && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Course Details</h3>
                  {MOCK_COURSES.filter(course => course.id === formData.courseId).map(course => (
                    <div key={course.id} className="space-y-2">
                      <p className="text-sm text-gray-600">{course.description}</p>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-gray-700">
                          <strong>Duration:</strong> {course.duration}
                        </span>
                        <span className="text-gray-700">
                          <strong>Fee:</strong> ${course.fee}
                        </span>
                        <span className="text-gray-700">
                          <strong>Status:</strong> {course.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div>
                <label htmlFor="batchId" className="form-label">Batch</label>
                <select
                  id="batchId"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleInputChange}
                  required
                  disabled={!formData.courseId}
                  className="form-input"
                >
                  <option value="">Select a batch</option>
                  {availableBatches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.name} - {batch.scheduleDetails} - Starts: {new Date(batch.startDate).toLocaleDateString()}
                    </option>
                  ))}
                </select>
                {formData.courseId && availableBatches.length === 0 && (
                  <p className="text-sm text-error-600 mt-1">No batches available for this course</p>
                )}
              </div>
              
              {formData.batchId && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-2">Batch Details</h3>
                  {availableBatches.filter(batch => batch.id === formData.batchId).map(batch => (
                    <div key={batch.id} className="space-y-2">
                      <div className="grid grid-cols-2 text-sm gap-y-2">
                        <div>
                          <strong>Instructor:</strong> {batch.instructorName}
                        </div>
                        <div>
                          <strong>Schedule:</strong> {batch.scheduleDetails}
                        </div>
                        <div>
                          <strong>Start Date:</strong> {new Date(batch.startDate).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>End Date:</strong> {new Date(batch.endDate).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Capacity:</strong> {batch.enrolled}/{batch.capacity}
                        </div>
                        <div>
                          <strong>Status:</strong> <span className="capitalize">{batch.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next: Payment Details
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment Details */}
          {formStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-4">
                <DollarSign className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
              </div>
              
              {formData.courseId && (
                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700">Course Fee:</span>
                    <span className="font-semibold">${MOCK_COURSES.find(c => c.id === formData.courseId)?.fee || 0}</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700">Registration Fee:</span>
                    <span className="font-semibold">$100</span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700">Materials:</span>
                    <span className="font-semibold">$50</span>
                  </div>
                  <div className="border-t border-gray-300 my-3"></div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>${(MOCK_COURSES.find(c => c.id === formData.courseId)?.fee || 0) + 150}</span>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                >
                  <option value="cash">Cash</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="online">Online Transfer</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="initialPayment" className="form-label">Initial Payment Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="initialPayment"
                    name="initialPayment"
                    value={formData.initialPayment}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="form-input pl-10"
                    placeholder="Enter amount"
                  />
                </div>
                {formData.courseId && formData.initialPayment && (
                  <p className="text-sm text-gray-600 mt-1">
                    Remaining: $
                    {((MOCK_COURSES.find(c => c.id === formData.courseId)?.fee || 0) + 150) - 
                      parseFloat(formData.initialPayment || '0')}
                  </p>
                )}
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Review & Confirm
                </button>
              </div>
            </div>
          )}
          
          {/* Step 4: Confirmation */}
          {formStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center mb-6">
                <UserPlus className="h-5 w-5 text-primary-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">Review & Confirm</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 border-b pb-2">Student Information</h3>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-sm text-gray-900">{formData.firstName} {formData.lastName}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Contact</p>
                    <p className="text-sm text-gray-900">{formData.email}</p>
                    <p className="text-sm text-gray-900">{formData.phone}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-sm text-gray-900">{formData.address}</p>
                    <p className="text-sm text-gray-900">
                      {formData.city}, {formData.state} {formData.postalCode}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-gray-900 border-b pb-2">Course Details</h3>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Center</p>
                    <p className="text-sm text-gray-900">
                      {MOCK_CENTERS.find(c => c.id === formData.centerId)?.name}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Course</p>
                    <p className="text-sm text-gray-900">
                      {MOCK_COURSES.find(c => c.id === formData.courseId)?.name}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Batch</p>
                    <p className="text-sm text-gray-900">
                      {MOCK_BATCHES.find(b => b.id === formData.batchId)?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {MOCK_BATCHES.find(b => b.id === formData.batchId)?.scheduleDetails}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-md font-medium text-gray-900 border-b pb-2 mb-4">Payment Summary</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Course Fee:</span>
                    <span className="text-sm font-medium">${MOCK_COURSES.find(c => c.id === formData.courseId)?.fee || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Registration Fee:</span>
                    <span className="text-sm font-medium">$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-700">Materials:</span>
                    <span className="text-sm font-medium">$50</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Total:</span>
                    <span className="text-sm font-semibold">${(MOCK_COURSES.find(c => c.id === formData.courseId)?.fee || 0) + 150}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Initial Payment:</span>
                    <span className="text-sm font-semibold">${formData.initialPayment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Remaining:</span>
                    <span className="text-sm font-semibold">
                      ${((MOCK_COURSES.find(c => c.id === formData.courseId)?.fee || 0) + 150) - 
                        parseFloat(formData.initialPayment || '0')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Payment Method:</span>
                    <span className="text-sm font-medium capitalize">{formData.paymentMethod.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Complete Admission
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;