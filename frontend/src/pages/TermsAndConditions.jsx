import React from "react";
import Header from '../components/Header'

const TermsAndConditions = () => {
  return (
    <>
      <Header/>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>

        <p className="text-justify">
          Welcome to Emirnest. By accessing or using this platform, you agree to
          comply with and be bound by the following terms and conditions. Please
          read them carefully before using our services.
        </p>

        <section>
          <h2 className="text-xl font-semibold">1. Use of the Platform</h2>
          <p className="text-justify">
            Emirnest is provided for informational and property listing purposes
            only. Users must ensure that all information submitted is accurate and
            up to date. Any misuse of the platform may result in account suspension
            or termination.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p className="text-justify">
            Users are responsible for maintaining the confidentiality of their
            login credentials. Emirnest will not be responsible for any loss or
            damage arising from unauthorized access to your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Property Listings</h2>
          <p className="text-justify">
            All property listings are submitted by users. Emirnest does not verify
            ownership, pricing, or availability of properties and is not liable for
            any inaccuracies or disputes arising from listings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Prohibited Activities</h2>
          <p className="text-justify">
            Users must not engage in any activity that disrupts or interferes with
            the platform, including posting false information, attempting
            unauthorized access, or using the platform for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <p className="text-justify">
            Emirnest shall not be held liable for any direct, indirect, or
            consequential damages resulting from the use or inability to use the
            platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Changes to Terms</h2>
          <p className="text-justify">
            We reserve the right to update or modify these terms at any time
            without prior notice. Continued use of the platform constitutes
            acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Contact Information</h2>
          <p className="text-justify">
            If you have any questions regarding these terms, please contact us
            through the contact page available on the platform.
          </p>
        </section>

        <p className="text-sm text-gray-500">
          Last updated: January 2026
        </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
