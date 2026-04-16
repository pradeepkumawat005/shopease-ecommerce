import {
  Grid,
  Typography,
  TextField,
  Card,
  Divider,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useState, useContext } from "react";
import { AppContext } from "../ContextApp/AppContext";
import '../components/Checkout.css'
import { useNavigate } from "react-router-dom";


const steps = ["Information", "Shipping", "Payment"];

export default function Checkout() {
  const { cartItems , setCartItems } = useContext(AppContext);
  const navigate = useNavigate()

  const [activeStep, setActiveStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const subtotal = cartItems.reduce((acc, item) => {
  const price = parseFloat(item.price) || 0;
  const qty = parseInt(item.quantity) || 0;

  return acc + price * qty;
}, 0);

const shipping = subtotal > 500 ? 0 : subtotal === 0 ? 0 : 50;

const total = subtotal + shipping;
  const handleNext = () => {
    if (activeStep === 0 && (!form.name || !form.address)) {
      alert("Please fill required fields");
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleOrder = () => {
    alert("Order Placed ✅");
    localStorage.removeItem("cartItems");
    setCartItems([]);
    navigate('/')

  };

  return (
    <Box className="checkout_wrapper page-width" sx={{ p: 4, bgcolor: "#f5f5f5" }}>

      <Grid container spacing={4} sx={{justifyContent:'center'}}>

        {/* LEFT SIDE */}
        <Grid item xs={12} md={7}>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Card sx={{ p: 3, borderRadius: 3 }}>

            {activeStep === 0 && (
              <>
                <Typography variant="h6" mb={2}>Contact Information</Typography>

                <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Full Name" name="name" value={form.name} onChange={handleChange} margin="normal" />
                <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} margin="normal" />

                <Typography variant="h6" mt={3}>Shipping Address</Typography>

                <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} margin="normal" />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} />
                  </Grid>
                </Grid>
                <TextField fullWidth label="Zip Code" name="zip" value={form.zip} onChange={handleChange} margin="normal" />
              </>
            )}

            {activeStep === 1 && (
              <>
                <Typography variant="h6">Shipping Method</Typography>
                <Card sx={{ p: 2, mt: 2, border: "1px solid #ddd" }}>
                  <Typography>
                    Standard Delivery {shipping === 0 ? "(Free)" : `₹${shipping}`}
                  </Typography>
                </Card>
              </>
            )}

            {activeStep === 2 && (
              <>
                <Typography variant="h6">Payment</Typography>
                <Card sx={{ p: 2, mt: 2, border: "1px solid #ddd" }}>
                  <Typography>Cash on Delivery</Typography>
                </Card>
              </>
            )}

            <Box display="flex" justifyContent="space-between" mt={3}>
              {activeStep < 2 ? (
                <Button variant="contained" onClick={handleNext} sx={{marginTop:'20px'}} >
                  Continue
                </Button>
              ) : (
                <Button variant="contained" color="success" onClick={handleOrder} sx={{marginTop:'20px'}}>
                  Place Order
                </Button>
              )}
            </Box>
          </Card>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, borderRadius: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" mb={2}>Order Summary</Typography>

            {cartItems.length === 0 ? (
              <Typography>No items in cart</Typography>
            ) : (
              cartItems.map((item) => (
                <Box key={item.id} display="flex" gap={2} mb={2}  sx={{
    display: "flex",
    gap: 2,
    mb: 2,
                    
  }} >            
                  <div className="item_quantiy">
                  <img src={item.thumbnail} alt="" width="80" style={{ borderRadius: "8px" }} />
                  <span className="item_qty_in"> {item.quantity}</span>
                  </div>
                  <Box sx={{ width: 200 }}>
                    <Typography fontWeight="bold"  style={{ textAlign: "left" }} >{item.title}</Typography>
                  </Box>
                    <Typography variant="body2">
                     ${item.price}
                    </Typography>
                </Box>
              ))
            )}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" sx={{
    display: "flex",
    gap: 2,
    mb: 2,
    justifyContent: "space-between"
                    
  }}>
              <Typography>Subtotal</Typography>
              <Typography>${subtotal.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" sx={{
    display: "flex",
    gap: 2,
    mb: 2,
    justifyContent: "space-between"             
  }}>
              <Typography>Shipping</Typography>
              <Typography>{shipping === 0 ? "Free" : `$${shipping}`}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" sx={{
    display: "flex",
    gap: 2,
    mb: 2,
    justifyContent: "space-between"               
  }}>
              <Typography fontWeight="bold"><h3>Total</h3></Typography>
              <Typography fontWeight="bold">${total.toFixed(2)}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
