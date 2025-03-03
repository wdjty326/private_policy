<script lang="ts">
  import { t } from '$lib/i18n';
  
  function handleGoogleLogin() {
    // Google OAuth2 로그인 로직
  }
</script>

<div class="login-container">
  <button class="google-login-btn" on:click={handleGoogleLogin}>
    <img src="/google-icon.svg" alt="Google" />
    {$t('login_with_google')}
  </button>
  
  <div class="terms-agreement">
    <input type="checkbox" id="terms-checkbox" required />
    <label for="terms-checkbox">
      {$t('i_agree_to')} <a href="/terms/privacy-policy" target="_blank">{$t('privacy_policy')}</a>
    </label>
  </div>
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .google-login-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .google-login-btn:hover {
    background-color: #f5f5f5;
  }
  
  .google-login-btn img {
    width: 24px;
    height: 24px;
  }
  
  .terms-agreement {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  .terms-agreement a {
    color: #4285F4;
    text-decoration: underline;
  }
</style> 