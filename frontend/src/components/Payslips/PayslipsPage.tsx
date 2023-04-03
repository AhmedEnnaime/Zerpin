import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IPayslip from "../../Interfaces/Payslip";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import API from "../../utils/API";
import IContract from "../../Interfaces/Contract";
import jsPDF from "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (config: object) => jsPDF;
  }
}

const PayslipsPage = () => {
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const { user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [payslips, setPayslips] = useState<IPayslip[]>();

  const getPayslips = async () => {
    await API.get(`payslips`)
      .then((res) => {
        setPayslips(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generatePdf = async (payslip: IPayslip) => {
    const doc = new jsPDF();

    // Set font styles
    doc.setFont("Helvetica", "normal");

    // Add a title to the payslip
    doc.setFontSize(22);
    doc.text("Payslip", 14, 22);

    // Add payslip data
    doc.setFontSize(16);
    doc.text(`Payslip Reference: ${payslip.ref}`, 14, 40);
    doc.text(`Date: ${payslip.created_at?.split("T")[0]}`, 14, 50);

    // Add contract data
    const contract: IContract = payslip.contract!;
    const contractData = [
      ["Contract Ref", contract.ref],
      ["Employee", `${contract.user?.fname} ${contract.user?.lname}`],
      ["Position", contract.position],
      ["Monthly Base Salary", contract.base_salary],
      ["Monthly Final Salary", contract.final_salary],
      ["Annual Base Salary", contract.base_salary * 12],
      ["Annual Final Salary", contract.final_salary * 12],
    ];
    doc.setFontSize(14);
    doc.text("Contract INformations", 14, 70);
    doc.autoTable({
      startY: 78,
      head: [],
      body: contractData,
    });

    // Add rules data
    if (contract.rules) {
      let y = (doc as any).autoTable.previous.finalY + 10;
      const rulesData = [
        [{ content: "Rules", colSpan: 2, styles: { halign: "center" } }, ""],
      ];
      contract.rules.forEach((rule) => {
        const symbol = rule.type === "AUGMENTATION" ? "-" : "+";
        rulesData.push([
          `Monthly ${rule.name} Rising: ${symbol}${rule.rate}`,
          `Annual ${rule.name} Rising: ${symbol}${rule.rate * 12}`,
        ]);
      });
      doc.setFontSize(12);
      doc.autoTable({
        startY: y,
        head: [],
        body: rulesData,
      });
    }

    // Save and download the PDF
    doc.save(`${payslip.contract?.user?.lname}'s Payslip.pdf`);
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    } else if (user?.role != "ADMIN") {
      navigate("/");
    }
    getPayslips();
  }, []);
  return (
    <>
      <div className="px-4 mt-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Payslips</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Ref
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Employee
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {payslips ? (
                      payslips.map((payslip) => (
                        <tr key={payslip.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {payslip.ref}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {payslip.contract?.user?.fname}{" "}
                              {payslip.contract?.user?.lname}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {payslip.created_at?.split("T")[0]}
                            </div>
                          </td>

                          {user?.role == "ADMIN" ? (
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => {
                                  generatePdf(payslip);
                                }}
                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <i className="fa-sharp fa-solid fa-download pr-2"></i>
                                Download Payslip
                              </button>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <h1>No payslip available</h1>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayslipsPage;
