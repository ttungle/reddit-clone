package com.thanhtungle.redditclone.util;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class RSAKeyGeneratorUtility {
    public static KeyPair generateRsaKey() {
        KeyPair keyPair;

        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keyPair = keyPairGenerator.generateKeyPair();
        } catch(Exception exc) {
            throw new IllegalStateException();
        }

        return keyPair;
    }
}
