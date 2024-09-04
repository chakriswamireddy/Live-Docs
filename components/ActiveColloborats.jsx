import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image';

function ActiveColloborats() {
    const others = useOthers();

    const colloborators = others.map((colab) => colab.info)

    return (
        <ul className="collaborators—list" > 
            {colloborators.map(({id , avatar,  name, color}) => (
                <li key={id}>
                    <Image
                        src={avatar}
                        alt={name}
                        height={35}
                        width={35}
                        className='inline-block size-8 rounded-md ring-2 ring-dark-100'
                        style={{ border: `3px solid ${color}`, borderRadius:'50%' }}
                    />
                </li>
            ))}
        </ul>
    )
}

export default ActiveColloborats