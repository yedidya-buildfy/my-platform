"use client"

import { motion } from "framer-motion"
import ShopifyPartnerForm from "./steps/ShopifyPartnerForm"

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Connect your Shopify Partner account
        </h1>
        <p className="text-gray-600 mb-10">
          Enter your Shopify Partner credentials so we can create apps on your behalf.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl mx-auto"
      >
        <ShopifyPartnerForm />
      </motion.div>
    </div>
  )
}
