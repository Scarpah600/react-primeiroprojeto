import React from 'react'
import IconButton from '../template/iconButton'
export default props => {
    const renderRows = () => {

        const list = props.list || []

            return list.map(todo => (
                <tr key={todo._id}>
                    <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>

                    <td >
                        <IconButton style="sucess" icon="check" hide={todo.done}
                        onClick={() => props.handleMarkDone(todo)}></IconButton>
                        <IconButton style="warning" icon="undo" hide={!todo.done}
                        onClick={() => props.handleMarkPending(todo)}></IconButton>
                        <IconButton style="danger" icon="trash-o" hide={!todo.done}
                        onClick={() => props.handleRemove(todo)}></IconButton>
                     
                    </td>
                    
                </tr>
            ))
    }
    return (
        <table className='table'>
            <tread>
                <tr>
                    <th>Descricao</th>
                    <tr className="tableActions">Ações</tr>
                </tr>
            </tread>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}