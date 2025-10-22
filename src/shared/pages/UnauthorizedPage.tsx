import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const UnauthorizedPage = () => {
  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="text-center pt-12 pb-10">
          <h1 className="text-9xl font-bold text-gray-200">403</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Unauthorized Access
          </h2>
          <p className="text-gray-600 mt-2">
            You don't have permission to access this page.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">
              <p className="text-white">Go to back</p>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedPage;
