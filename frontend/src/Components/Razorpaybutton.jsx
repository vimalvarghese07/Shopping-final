import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { useSelected } from "../Helper/selectedContext";
import { useAuth } from "../store/store";
import { CreateOrder, deleteCart } from "../Helper/Helper";
import { useNavigate } from "react-router-dom";

export default function RazorpayButton({amount,Name,Email,Phonenumber,Address,customclass,text}) {
  const navigate = useNavigate()
  const [Razorpay] = useRazorpay();
  const {state}= useAuth();
  const { selectedItem } = useSelected();
  const data={
    userid:JSON.parse(state.user).id,
    productid:selectedItem.id,
    quantity:selectedItem?.quantity || 1
  }
  // console.log(selectedItem) 

  const MakeOrder = async ()=>{

    const response= await CreateOrder({values:data})
    try {
      const deleteresponse = await deleteCart({values:data.productid})
      
    } catch (error) {
      console.log(error)
      
    }
    navigate('/shop')
  }

  const handlePayment = useCallback(async () => {
    // const order = await createOrder(params);

    const options: RazorpayOptions = {
      key: "rzp_test_X0BeAfg82FLyFq",
      amount: `${amount * 100}`,
      currency: "INR",
      name: "TIMESTORE",
      description: "Test Transaction",
    //   image: "https://example.com/your_logo",
    //   order_id: order.id,
      handler: (res) => {
        console.log(res.razorpay_payment_id);
        MakeOrder()
      },
      prefill: {
        name: Name,
        email: Email,
        contact: Phonenumber,
      },
      notes: {
        address: Address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
      <button className={customclass} onClick={handlePayment}>{text}</button>
  );
}