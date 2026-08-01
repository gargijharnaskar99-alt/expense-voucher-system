export default function RecentActivity({
  expenses = [],
}) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-bold mb-5">

        Recent Expenses

      </h2>

      {expenses.length === 0 ? (

        <p className="text-gray-500">

          No Recent Expenses

        </p>

      ) : (

        expenses.slice(0,5).map((expense)=>(

          <div
            key={expense._id}
            className="flex justify-between py-3 border-b"
          >

            <div>

              <p className="font-semibold">

                {expense.title}

              </p>

              <small className="text-gray-500">

                {expense.category}

              </small>

            </div>

            <div>

              ₹{expense.amount}

            </div>

          </div>

        ))

      )}

    </div>

  );

}