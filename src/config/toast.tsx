import toast from "react-hot-toast";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiCrossMark } from "react-icons/gi";

class ToastClass {
  success(message: string) {
    toast.success(message, {
      icon: <IoMdCheckmarkCircleOutline size={22} />,
      style: {
        padding: "5px 8px",
        color: "#fff",
        background: "#292D32",
        borderRadius: "4px",
        fontWeight: "500",
        width: "250px",
        height: "40px",
        textAlign: "left",
        fontSize: "14px",
        // minWidth: '300px'
      },
    });
  }

  error(message: string) {
    toast.error(message, {
      icon: <GiCrossMark size={22} />,
      style: {
        padding: "5px 8px",
        color: "#fff",
        background: "#da072b",
        borderRadius: "4px",
        fontWeight: "500",
        minWidth: "250px",
        height: "40px",
        textAlign: "left",
      },
    });
  }
}

export const Toast = new ToastClass();
// export default Toast;
