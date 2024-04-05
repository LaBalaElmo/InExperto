type InfoProps = {
    info: {
        id: number;
        title: string;
        content: string;
    }[];
};

function Info({ info }: InfoProps) {
    return (
        <table className="table-fixed">
            <tbody>
                {info.map((item) => (
                    <tr key={item.id} className="grid grid-cols-[0.5fr_1fr]">
                        <td key={item.id}>
                            <h4 className="font-bold">{item.title}</h4>
                        </td>
                        <td>{item.content}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Info;
