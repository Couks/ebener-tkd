"use client";

import { forwardRef, useEffect } from "react";
import SignaturePad from "react-signature-canvas";
import { useIsMobile } from "@/hooks/use-mobile";
import type { ReactNode } from "react";

interface SignatureCanvasProps {
  width?: number;
  height?: number;
  children?: ReactNode;
}

const SignatureCanvas = forwardRef<SignaturePad, SignatureCanvasProps>(
  ({ height = 200 }, ref) => {
    const isMobile = useIsMobile();

    useEffect(() => {
      // Ajustar o tamanho do canvas quando o componente montar
      const handleResize = () => {
        if (ref && typeof ref !== "function" && ref.current) {
          ref.current.clear(); // Limpar para evitar distorções
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [ref]);

    return (
      <div className="w-full touch-none">
        <SignaturePad
          ref={ref}
          canvasProps={{
            className: "w-full touch-none",
            style: {
              touchAction: "none",
              width: "100%",
              height: isMobile ? "150px" : "200px",
            },
          }}
          backgroundColor="white"
          penColor="black"
        />
      </div>
    );
  }
);

SignatureCanvas.displayName = "SignatureCanvas";

export default SignatureCanvas;
