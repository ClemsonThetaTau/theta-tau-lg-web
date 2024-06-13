import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{marginBottom: '25px'}}>Thank you for Verifying Your Email!</h1>
            <Button>
                <a href="/">Go to Home</a>
            </Button>
        </div>
    );
};

export default VerifyEmail;
