/* eslint-disable react-refresh/only-export-components */
"use client";

import {
  useNavigate,
  useRouteError,
  type ClientOnErrorFunction,
} from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";

export type Error = {
  data: string;
  error: { message: string; stack: string };
  internal: boolean;
  status: number;
  statusText: string;
  message?: string;
};

export const ErrorPage = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  console.log(error);

  const isNotFound = error?.status === 404;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl w-full">
        {/* Error code section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
            <span className="text-4xl font-black">
              {isNotFound ? "404" : "Error"}
            </span>
          </div>

          <h1 className="text-5xl font-black text-foreground mb-4 tracking-tight">
            {error.error?.message ||
              error.message ||
              "Oops! Something went wrong"}
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="group gap-2"
          >
            <Home className="w-5 h-5" />
            Go to Home Back
          </Button>
          <Button
            onClick={() => navigate(-1)}
            size="lg"
            className="group gap-2"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            Go Back
          </Button>
        </div>

        {import.meta.env.DEV && error?.error?.stack && (
          <div className="mt-8 bg-card border border-dashed border-red-500 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Debug Stack Trace
            </h3>

            <pre className="text-xl text-muted-foreground overflow-x-auto whitespace-pre-wrap font-mono">
              {error.error.stack}
            </pre>
          </div>
        )}

        {/* Helpful info card */}
        <div className="bg-card border border-border rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            What can you do?
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent font-semibold text-sm flex-shrink-0 mt-0.5">
                1
              </span>
              <span className="text-muted-foreground">
                Try searching for the project or workspace in CollabHub
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent font-semibold text-sm flex-shrink-0 mt-0.5">
                2
              </span>
              <span className="text-muted-foreground">
                Check the URL and make sure it's correct
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent font-semibold text-sm flex-shrink-0 mt-0.5">
                3
              </span>
              <span className="text-muted-foreground">
                If you believe this is a mistake, reach out to our support team
              </span>
            </li>
          </ul>
        </div>

        {/* Footer info */}
        <div className="text-center mt-12 text-sm text-muted-foreground/60">
          <p>
            Error code:{" "}
            <span className="font-mono font-semibold">
              {isNotFound ? "404_NOT_FOUND" : "ERROR_UNKNOWN"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export const onError: ClientOnErrorFunction = (error, errorInfo) => {
  // make sure to still log the error so you can see it
  console.log(error, errorInfo);
};
