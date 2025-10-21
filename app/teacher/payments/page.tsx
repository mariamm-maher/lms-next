import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { DollarSign, CreditCard, TrendingUp, Calendar } from "lucide-react";

export const runtime = "nodejs"; // ✅ Force Node.js runtime

async function getPaymentData(teacherId: number) {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: { userId: teacherId },
  });

  if (!teacherProfile) {
    return {
      totalEarnings: 0,
      pendingPayouts: 0,
      transactions: [],
      acceptedPayments: [],
    };
  }

  const payments = await prisma.payment.findMany({
    where: {
      status: "COMPLETED",
      courseId: {
        in: await prisma.course
          .findMany({
            where: { teacherId: teacherProfile.id },
            select: { id: true },
          })
          .then((courses) => courses.map((c) => c.id)),
      },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

  return {
    totalEarnings,
    pendingPayouts: totalEarnings * 0.1, // Mock: 10% pending
    transactions: payments,
    acceptedPayments: teacherProfile.acceptedPayments || [],
  };
}

export default async function TeacherPaymentsPage() {
  const session = await auth();
  const userId = parseInt(session?.user?.id || "0");
  const paymentData = await getPaymentData(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Payments & Payouts
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your earnings and payment methods
        </p>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-gray-900">
            ${paymentData.totalEarnings.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">Pending Payouts</p>
          <p className="text-3xl font-bold text-gray-900">
            ${paymentData.pendingPayouts.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">This Month</p>
          <p className="text-3xl font-bold text-gray-900">
            ${(paymentData.totalEarnings * 0.15).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg font-medium">
            Add Method
          </button>
        </div>

        {paymentData.acceptedPayments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentData.acceptedPayments.map((method, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{method}</p>
                    <p className="text-sm text-gray-600">Active</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">No payment methods added yet</p>
            <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all font-medium">
              Add Your First Method
            </button>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Transaction History
        </h2>
        {paymentData.transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paymentData.transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {transaction.description || "Course Payment"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {transaction.method}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
                      +${transaction.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No transactions yet</p>
        )}
      </div>
    </div>
  );
}
