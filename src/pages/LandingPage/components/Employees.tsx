import { Title } from "../../../components/texts/Title";
import { employessSays } from "../../../data/landingPage";
import { EmployeesCard } from "./EmployeesCard";

const Employees: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-10">
            <Title title="Employees" />
            <div className="flex flex-col md:flex-row gap-4 mt-10">
                {employessSays.map((employee) => (
                    <div className="flex flex-col w-full md:w:1/2 p-10 gap-4">
                        <EmployeesCard key={employee.id} {...employee} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employees;
