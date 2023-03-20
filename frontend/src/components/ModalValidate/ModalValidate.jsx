import s from "./style.module.css";
import { TbUserCheck } from "react-icons/tb"
import { BsFillPersonDashFill } from "react-icons/bs"

export function ModalValidate({modalText}) {
    return(
        <div className={s.container}>
            {modalText === "Inscription validée"?
                (
                    <div className={s.box}>
                        <TbUserCheck /> {modalText}
                    </div>
                )
                :
                (
                    <div className={s.box}>
                        <BsFillPersonDashFill /> {modalText}
                    </div>
                )
            }
        </div>
    )
}