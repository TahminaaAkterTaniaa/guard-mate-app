'use client'

export default function JobsPage() {
  return (
    <div className="bg-white rounded-lg p-4">
      <h1 className="text-xl font-bold text-blue-900 mb-6">Jobs</h1>
      
      {/* Upcoming Jobs */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Upcoming Jobs</h2>
        <div className="bg-white shadow rounded-lg p-4 mb-4 border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">Commercial Plaza Security</h3>
              <p className="text-sm text-gray-500">Tomorrow, 9:00 AM - 5:00 PM</p>
              <p className="text-sm text-gray-500">123 Business Ave, Suite 100</p>
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Confirmed
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4 border-l-4 border-yellow-400">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">Corporate Event Security</h3>
              <p className="text-sm text-gray-500">Thu, Jun 27, 6:00 PM - 11:00 PM</p>
              <p className="text-sm text-gray-500">Grand Hotel Conference Center</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
              Pending
            </div>
          </div>
        </div>
      </div>
      
      {/* Available Jobs */}
      <div>
        <h2 className="text-lg font-semibold text-blue-900 mb-3">Available Jobs</h2>
        <div className="text-center py-8 text-gray-500">
          No available jobs at this time.
          <br />
          Check back later for new opportunities.
        </div>
      </div>
    </div>
  );
}
