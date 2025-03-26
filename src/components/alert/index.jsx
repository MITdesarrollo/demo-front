import * as React from 'react';

const Alert = ({ className, variant, ...props }, ref) => {
  const styles = {
    position: 'relative',
    width: '100%',
    borderRadius: '0.5rem',
    border: '1px solid #e2e8f0',
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: '#1a202c',
    backgroundColor: '#fff',
  };

  if (variant === 'destructive') {
    styles.border = '1px solid #e53e3e';
    styles.color = '#e53e3e';
    styles.backgroundColor = '#fff5f5';
  }

  if (variant === 'success') {
    styles.border = '1px solid #68d391';
    styles.color = '#68d391';
    styles.backgroundColor = '#f0fff4';
  }

  return <div role="alert" style={styles} className={className} {...props} />;
};

const AlertTitle = ({ className, ...props }, ref) => (
  <h5 className={className} {...props} />
);

const AlertDescription = ({ className, ...props }, ref) => (
  <div className={className} {...props} />
);

export { Alert, AlertTitle, AlertDescription };
