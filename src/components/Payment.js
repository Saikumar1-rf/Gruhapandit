import React, { useEffect } from 'react'

function Payment() {
  useEffect(() => {
    // Dynamically adding Razorpay's form and script tag
    const form = document.createElement('form')
    const script = document.createElement('script')

    // Setting the attributes for the script as required by Razorpay
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js'
    script.setAttribute('data-payment_button_id', 'pl_P6Vv9czSHKkY2D')
    script.async = true

    // Append script inside form
    form.appendChild(script)

    // Append form to the container in the component
    document.getElementById('razorpay-button-container').appendChild(form)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Registration Process</h2>
        <p className="text-gray-700 text-center mb-4">Complete the payment to finalize your registration.</p>

        {/* {/ Razorpay payment button will be rendered here /} */}
        <div id="razorpay-button-container" className="flex justify-center mb-4">
          {/* {/ Razorpay form is dynamically added here via useEffect /} */}
        </div>

        {/* {/ Secure payment notice /} */}
        <div className="mt-6 text-gray-600 text-sm text-center">
          <i className="fas fa-lock"></i> Secure Payment Processing
        </div>

        {/* {/ Footer section for terms /} */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          By proceeding, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a>.
        </div>
      </div>
    </div>
  )
}

export default Payment