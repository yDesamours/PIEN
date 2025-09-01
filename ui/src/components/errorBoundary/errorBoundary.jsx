import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback: FallbackComponent, children } = this.props;

    if (hasError) {
      if (React.isValidElement(FallbackComponent)) {
        return FallbackComponent;
      }
      if (typeof FallbackComponent === "function") {
        return <FallbackComponent error={error} errorInfo={errorInfo} />;
      }
      return null;
    }

    return children;
  }
}

export default ErrorBoundary;
