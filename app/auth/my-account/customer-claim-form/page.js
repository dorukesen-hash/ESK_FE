'use client'

import React, {useContext, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import BreadCrumbs from '@/components/pageLayouts/BreadCrumbs';
import PageHeader from '@/components/pageLayouts/PageHeader';
import {AppContext} from '@/Context/AppContext';
import {successNote, errorNote} from '@/utils/ToastNotify';

export default function Page() {
  const router = useRouter();
  const {state} = useContext(AppContext);

  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
    defaultValues: {
      accountNumber: '',
      companyName: '',
      contactName: '',
      email: '',
      orderNumber: '',
      description: '',
      agree: false,
    }
  });

  useEffect(() => {
    if (!state?.user) router.push('/auth/login');
  }, [state?.user, router]);

  const onSubmit = async (data) => {
    try {
      const { agree, ...payload } = data; // agree sadece doğrulama için, payload API'ye gönderilebilir
      // Burada gerçek API entegrasyonu yapılabilir.
      // await api.post('/support/customer-claim', payload)
      await new Promise(r => setTimeout(r, 600)); // kısa simülasyon
      successNote('Your claim has been submitted. We\'ll contact you shortly.');
      reset();
    } catch (e) {
      errorNote('Submission failed. Please try again.');
    }
  };

  return (
    <div className="bg-white w-full flex justify-center">
      <div className="w-full max-w-[1132px] mb-[160px]">
        <BreadCrumbs hideSegments={['auth']}/>
        <PageHeader/>

        {/* Üst bilgilendirme metinleri */}
        <section className="text-text-dark pt-14">
          <p className="text-[16px] font-semibold mb-2">Please accept our apologies and complete ALL fields in the form below.</p>
          <p className="text-[12px] mb-4">All other claims may take up to 2 business days to process. We appreciate your patience and business.</p>

          <div className="flex items-start gap-3 my-4 pt-8">
            <input id="agree" type="checkbox" {...register('agree', {required: 'You must agree before submitting'})}
                   className="mt-[2px] w-5 h-5 border-border-gray rounded"/>
            <label htmlFor="agree" className="text-[16px] font-semibold">I have read and fully agree to the following:</label>
          </div>

          <div className="space-y-2 text-[12px] leading-[15px]">
            <p>All Claims submitted are subject to review and may require a return authorization.</p>
            <p>We accept return merchandise within 5 business days from the time of receipt that is not decorated and is in resellable condition.</p>
            <p>If you return merchandise on an order that qualified for free shipping, and that return brings your total under $200, you may be responsible for the original freight amount.</p>
            <p>There is a 25% restocking fee assessed and credit is issues for merchandise only. You will be contacted regarding your credit/return within three business days.</p>
          </div>
        </section>

        {/* Form kartı */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div className="w-full max-w-[766px] bg-white border-[2px] border-border-gray rounded-[8px] shadow-custom p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold text-text-dark mb-1">Account #</label>
                <input
                  type="text"
                  placeholder="Account #"
                  {...register('accountNumber', {required: 'Account number is required'})}
                  className={`w-full px-4 py-2 border rounded-[8px] placeholder:text-text-light ${errors.accountNumber ? 'border-red-400' : 'border-border-gray'}`}
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-text-dark mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  {...register('companyName', {required: 'Company name is required'})}
                  className={`w-full px-4 py-2 border rounded-[8px] placeholder:text-text-light ${errors.companyName ? 'border-red-400' : 'border-border-gray'}`}
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-text-dark mb-1">Contact Name</label>
                <input
                  type="text"
                  placeholder="Contact Name"
                  {...register('contactName', {required: 'Contact name is required'})}
                  className={`w-full px-4 py-2 border rounded-[8px] placeholder:text-text-light ${errors.contactName ? 'border-red-400' : 'border-border-gray'}`}
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-text-dark mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', {required: 'Email is required'})}
                  className={`w-full px-4 py-2 border rounded-[8px] placeholder:text-text-light ${errors.email ? 'border-red-400' : 'border-border-gray'}`}
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-text-dark mb-1">Order / PO / Invoice #</label>
                <input
                  type="text"
                  placeholder="Order / PO / Invoice #"
                  {...register('orderNumber', {required: 'Order / PO / Invoice # is required'})}
                  className={`w-full px-4 py-2 border rounded-[8px] placeholder:text-text-light ${errors.orderNumber ? 'border-red-400' : 'border-border-gray'}`}
                />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-text-dark mb-1">Description</label>
                <textarea
                  rows={5}
                  placeholder="Description"
                  {...register('description', {required: 'Description is required'})}
                  className={`w-full px-4 py-2 border rounded-[8px] placeholder:text-text-light resize-y ${errors.description ? 'border-red-400' : 'border-border-gray'}`}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-[152px] h-[40px] bg-custom-blue text-white rounded-[8px] hover:bg-custom-button-green transition disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>

        {/* Form genel hata/uyarıları */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 text-[12px] text-red-600">
            Please fill all required fields and accept the agreement.
          </div>
        )}
      </div>
    </div>
  );
}