import { useState } from 'react';

const usePasswordPolicy = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword] = useState('');

    const [passwordPolicy, setPasswordPolicy] = useState([
        { label: '8 characters', valid: false },
        { label: 'An uppercase letter (A-Z)', valid: false },
        { label: 'A lowercase letter (a-z)', valid: false },
        { label: 'A number (0-9)', valid: false },
        { label: 'A special character (e.g. !@#)', valid: false },
        { label: 'Password must match', valid: false },
    ]);

    const updatePasswordPolicy = (password: string) => {
        const valid = [
            { label: '8 characters', valid: password?.length >= 8 },
            {
                label: 'An uppercase letter (A-Z)',
                valid: /[A-Z]/.test(password),
            },
            {
                label: 'A lowercase letter (a-z)',
                valid: /[a-z]/.test(password),
            },
            { label: 'A number (0-9)', valid: /[0-9]/.test(password) },
            {
                label: 'A special character (e.g. !@#)',
                valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password),
            },
            {
                label: 'Password must match',
                valid: password === confirmPassword,
            },
        ];

        setPasswordPolicy(valid);
    };

    function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
        updatePasswordPolicy(e.target.value);
    }
    function onPasswordMustMatch(e: React.ChangeEvent<HTMLInputElement>) {
        const passwordMatch = e.target.value === password;
        const updatedPasswordPolicy = passwordPolicy.map((policy) => {
            if (policy.label === 'Password must match') {
                return { ...policy, valid: passwordMatch };
            }
            return policy;
        });

        setPasswordPolicy(updatedPasswordPolicy);
    }

    return {
        password,
        confirmPassword,
        passwordPolicy,
        onPasswordChange,
        onPasswordMustMatch,
    };
};

export default usePasswordPolicy;
