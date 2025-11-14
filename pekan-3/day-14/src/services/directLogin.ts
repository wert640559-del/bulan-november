export const directLogin = async (username: string, password: string) => {
  console.log('🚀 Direct login attempt:', username);
  
  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60,
      }),
      credentials: 'include' // ✅ TAMBAHKAN INI
    });

    console.log('📡 Response status:', response.status);

    const responseText = await response.text();
    console.log('📡 Raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.log('❌ JSON parse error:', e);
      return {
        success: false,
        error: 'Invalid JSON response'
      };
    }

    console.log('📡 Parsed data:', data);

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `HTTP ${response.status}: ${response.statusText}`
      };
    }

    // ✅ PERBAIKI STRUCTURE RESPONSE
    return {
      success: true,
      data: {
        userID: data.id?.toString(),
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName, 
        image: data.image,
        token: data.accessToken, // ✅ GUNAKAN accessToken BUKAN token
        refreshToken: data.refreshToken
      }
    };

  } catch (error: any) {
    console.log('❌ Fetch error:', error);
    return {
      success: false,
      error: error.message || 'Network request failed'
    };
  }
};