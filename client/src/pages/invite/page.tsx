import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, Shield, FileText } from "lucide-react";
import { usePageContext } from "./_context";


export default function InvitationPage() {
  const ctx = usePageContext();
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">(
    "pending",
  );

  if(ctx.error) throw new Error(ctx.error);

  const isLoading = ctx.loading;

  // Mock invitation data
  const invitationData = ctx.invite;
  const expiryDate = new Date(invitationData.expireAt);
  const createdDate = new Date(invitationData.createdAt);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 md:p-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {status === "pending" && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            {/* Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                You're Invited
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                You've been invited to collaborate on a project. Review the
                details below and decide whether to accept or decline.
              </p>
            </div>

            {/* Main Card */}
            <Card className="bg-card border-border/50 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 space-y-8">
                {/* Invitation Details */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Email Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Recipient Email
                    </label>
                    <p className="text-xl font-semibold text-foreground break-all">
                      {invitationData.email}
                    </p>
                  </div>

                  {/* Role Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Access Level
                    </label>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <p className="text-xl font-semibold text-foreground capitalize">
                        {invitationData.role} Access
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/30"></div>

                {/* Timeline Information */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Created Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Invitation Sent
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          {createdDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {createdDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                      Expires
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-destructive/70" />
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          {expiryDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {expiryDate.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/30"></div>

                {/* Important Notice */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    What is {invitationData.role.toUpperCase()} access?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {invitationData.role === "read"
                      ? "You will be able to view and access all project files and resources, but cannot make modifications."
                      : "You will have full access to manage and modify project resources."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={ctx.handleJoinProjectClick}
                    disabled={isLoading}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Accept Invitation
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Footer Info */}
            <p className="text-center text-sm text-muted-foreground">
              This invitation will expire on{" "}
              <span className="font-semibold text-foreground">
                {expiryDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        )}

        {status === "accepted" && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Invitation Accepted!
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                You've successfully accepted the invitation. You now have{" "}
                {invitationData.role} access to the project.
              </p>
            </div>

            <Card className="bg-card border-emerald-500/20 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 space-y-6">
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-emerald-500">
                    Next Steps
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                    <li>
                      Check your email for project details and access links
                    </li>
                    <li>Explore the project resources and files</li>
                    <li>Connect with other team members</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                  >
                    Go to Project
                  </Button>
                  <Button
                    onClick={() => setStatus("pending")}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted h-12 text-base font-semibold"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {status === "declined" && (
          <div className="space-y-6 animate-in fade-in-50 duration-500">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20">
                <XCircle className="w-10 h-10 text-destructive" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Invitation Declined
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                You've declined the invitation. You can still accept it later if
                you change your mind.
              </p>
            </div>

            <Card className="bg-card border-destructive/20 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="p-8 md:p-10 space-y-6">
                <div className="bg-destructive/5 border border-destructive/10 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-destructive">
                    Invitation Details
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This invitation remains valid until{" "}
                    {expiryDate.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    . Contact the sender if you have any questions.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setStatus("pending")}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-semibold"
                  >
                    Reconsider
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    variant="outline"
                    className="flex-1 border-border hover:bg-muted h-12 text-base font-semibold"
                  >
                    Leave
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
