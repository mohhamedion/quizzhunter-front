export default function ({ $axios, env }) {
  const baseUrl = env.baseUrl || 'https://apiquizz.smartsupport.pro'
  const apiBaseUrl = baseUrl + '/api'
  
  // Set base URL for all axios requests
  $axios.setBaseURL(apiBaseUrl)
  
  // Add request interceptor to handle API calls
  $axios.onRequest(config => {
    // Check if URL has been incorrectly doubled (contains baseUrl twice)
    // This can happen if axios prepends baseURL to an absolute URL
    if (config.url.includes(apiBaseUrl + apiBaseUrl)) {
      // Extract just the path part after the second occurrence
      const index = config.url.indexOf(apiBaseUrl + apiBaseUrl)
      config.url = config.url.substring(index + apiBaseUrl.length)
      return config
    }
    
    // If URL is absolute (starts with http:// or https://)
    if (config.url.startsWith('http://') || config.url.startsWith('https://')) {
      // Replace old production URLs with current baseUrl
      if (config.url.includes('quizzhunter-api.tavakal.com')) {
        config.url = config.url.replace('https://quizzhunter-api.tavakal.com', apiBaseUrl)
        // Convert to relative path to prevent double prepending
        if (config.url.startsWith(apiBaseUrl)) {
          config.url = config.url.substring(apiBaseUrl.length)
          if (!config.url.startsWith('/')) {
            config.url = '/' + config.url
          }
        }
        return config
      }
      // Replace localhost:8080 with production baseUrl
      if (config.url.includes('localhost:8080')) {
        config.url = config.url.replace(/http:\/\/localhost:8080/g, apiBaseUrl)
        // Convert to relative path to prevent double prepending
        if (config.url.startsWith(apiBaseUrl)) {
          config.url = config.url.substring(apiBaseUrl.length)
          if (!config.url.startsWith('/')) {
            config.url = '/' + config.url
          }
        }
        return config
      }
      // If URL already contains the full baseUrl + /api, convert to relative path
      // to prevent axios from prepending baseURL again
      if (config.url.startsWith(apiBaseUrl)) {
        // Extract the path after the base URL
        config.url = config.url.substring(apiBaseUrl.length)
        // Ensure it starts with /
        if (!config.url.startsWith('/')) {
          config.url = '/' + config.url
        }
        return config
      }
      // If URL starts with baseUrl but not /api, it's missing /api
      if (config.url.startsWith(baseUrl) && !config.url.startsWith(apiBaseUrl)) {
        // Replace baseUrl with apiBaseUrl and convert to relative
        config.url = config.url.replace(baseUrl, '')
        // Ensure it starts with /
        if (!config.url.startsWith('/')) {
          config.url = '/' + config.url
        }
        return config
      }
      // For other absolute URLs (different domain), return as-is
      // Axios should not prepend baseURL for absolute URLs, but if it does,
      // the first check above will catch it
      return config
    }
    
    // For relative URLs starting with /api, remove /api since baseURL already includes it
    if (config.url.startsWith('/api')) {
      config.url = config.url.substring(4) // Remove '/api' prefix
      // Ensure it starts with /
      if (!config.url.startsWith('/')) {
        config.url = '/' + config.url
      }
      return config
    }
    
    // For other relative URLs starting with /, return as-is
    // Axios will prepend baseURL which includes /api
    if (config.url.startsWith('/')) {
      return config
    }
    
    // No leading slash, return as-is (axios will prepend baseURL which includes /api)
    return config
  })
}

