function TableRow(serial: number, totalKM: number, frontKM: number, backKM: number) {

    return (
        <>
            <tr>
                <td>{serial}</td>
                <td>{totalKM}</td>
                <td>{frontKM}</td>
                <td>{backKM}</td>
                <td>
                <button>Edit</button>
                </td>
            </tr>
        </>
    )
}

export default TableRow