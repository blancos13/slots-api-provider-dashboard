"use client"

import { Info, Copy, User, Key, Clock, Loader2, LayoutDashboard, DollarSign } from "lucide-react"
import { useState } from "react"
import { useQuery } from '@apollo/client'
import { GET_BALANCE_QUERY, GET_BILLING_CYCLE_QUERY } from '@/lib/graphql/auth'

export default function DashboardPage() {
  const [copied, setCopied] = useState(false)
  const depositAddress = "0xa38b04735C44F5e8ca6EAbFb3611E068F323a31f"
  
  const { data: balanceData, loading: balanceLoading } = useQuery(GET_BALANCE_QUERY, {
    fetchPolicy: 'network-only',
  })

  const { data: billingData, loading: billingLoading } = useQuery(GET_BILLING_CYCLE_QUERY, {
    fetchPolicy: 'network-only',
  })

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(depositAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  // Calculate billing cycle percentage
  const billingPercentage = billingData?.getBillingCycle 
    ? (billingData.getBillingCycle.current / billingData.getBillingCycle.limit) * 100 
    : 0

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Deposit Info */}
      <section>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Info className="h-4 sm:h-5 w-4 sm:w-5 text-[#18B69B]" />
          <h2 className="text-base sm:text-lg font-medium">Deposit Info</h2>
        </div>
        <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-xs sm:text-sm text-gray-600 mb-2">Your deposit address - Ethereum (ERC20)</h3>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-gray-50 p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-mono break-all">
                  {depositAddress}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Copy className="h-4 sm:h-5 w-4 sm:w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-[#18B69B]" />
          <h2 className="text-base sm:text-lg font-medium">Statistics</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-gray-600">Balance</div>
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="h-3 sm:h-4 w-3 sm:w-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-green-500 text-xl sm:text-2xl font-semibold">$</span>
                {balanceLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#18B69B]" />
                  </div>
                ) : (
                  <span className="text-xl sm:text-2xl font-semibold">
                    {balanceData?.getBalance.toFixed(2) || '0.00'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-gray-600">Current Billing Cycle ($)</div>
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="h-3 sm:h-4 w-3 sm:w-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
                {billingLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#18B69B]" />
                  </div>
                ) : (
                  <span className="text-xl sm:text-2xl font-semibold">
                    {billingData?.getBillingCycle?.current.toFixed(2) || '0.00'}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-3 sm:p-4">
              <div className="text-xs sm:text-sm text-gray-600">Billing Cycle Limit Reached (%)</div>
              <button className="text-gray-400 hover:text-gray-500">
                <svg className="h-3 sm:h-4 w-3 sm:w-4" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                  <circle cx="4" cy="8" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#18B69B] transition-all duration-500" 
                      style={{ width: `${Math.min(billingPercentage, 100)}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-gray-500">
                      {billingLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-[#18B69B]" />
                      ) : (
                        `${billingPercentage.toFixed(1)}%`
                      )}
                    </span>
                    <span className="text-gray-500">
                      Limit: ${billingData?.getBillingCycle?.limit.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User General Info */}
      <section>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <User className="h-4 sm:h-5 w-4 sm:w-5 text-[#18B69B]" />
          <h2 className="text-base sm:text-lg font-medium">User General Info</h2>
        </div>
        <div className="bg-white rounded-lg divide-y divide-gray-200 border border-gray-200">
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Info className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium mb-1">Billing Method: GGR Billing - billed per 3 days (limit)</h3>
                <p className="text-xs sm:text-sm text-gray-600">GGR is billed every 3 days from your account balance, make sure it is sufficient.</p>
              </div>
              <button className="text-gray-400 hover:text-gray-500 flex-shrink-0">
                <Info className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="h-8 w-8 sm:h-10 sm:w-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Key className="h-4 sm:h-5 w-4 sm:w-5 text-purple-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-medium mb-1">Amount of API Keys: 1</h3>
                <p className="text-xs sm:text-sm text-gray-600">Feel free to ask support additional api keys for your integration.</p>
              </div>
              <button className="text-gray-400 hover:text-gray-500 flex-shrink-0">
                <Info className="h-4 sm:h-5 w-4 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

