<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap - 805 HVAC Pro</title>
        <meta name="robots" content="noindex"/>
        <style>
          /* Reset and Base Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #374151;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            min-height: 100vh;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
          }
          
          /* Header Styles */
          .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
            color: white;
            padding: 3rem 0;
            text-align: center;
            margin-bottom: 3rem;
            border-radius: 1rem;
            box-shadow: 0 10px 25px rgba(30, 58, 138, 0.3);
          }
          
          .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, white 0%, #fde68a 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .header p {
            font-size: 1.125rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
          }
          
          /* Stats Section */
          .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
          }
          
          .stat-card {
            background: white;
            padding: 1.5rem;
            border-radius: 1rem;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
          }
          
          .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 0.5rem;
          }
          
          .stat-label {
            color: #6b7280;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          /* Table Styles */
          .table-container {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            border: 1px solid #e5e7eb;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          thead {
            background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
            color: white;
          }
          
          th {
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.875rem;
          }
          
          tbody tr {
            border-bottom: 1px solid #f3f4f6;
            transition: background-color 0.2s ease;
          }
          
          tbody tr:hover {
            background-color: #f8fafc;
          }
          
          tbody tr:last-child {
            border-bottom: none;
          }
          
          td {
            padding: 1rem;
            vertical-align: middle;
          }
          
          /* URL Styling */
          .url-link {
            color: #1e40af;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px solid transparent;
            transition: all 0.2s ease;
          }
          
          .url-link:hover {
            color: #1d4ed8;
            border-bottom-color: #1d4ed8;
          }
          
          /* Priority Badges */
          .priority-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          
          .priority-high {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #1f2937;
          }
          
          .priority-medium {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
          }
          
          .priority-low {
            background: linear-gradient(135deg, #6b7280, #4b5563);
            color: white;
          }
          
          /* Change Frequency Styling */
          .change-freq {
            font-size: 0.875rem;
            color: #6b7280;
            text-transform: capitalize;
          }
          
          /* Date Styling */
          .last-modified {
            font-size: 0.875rem;
            color: #4b5563;
            font-family: 'Courier New', monospace;
          }
          
          /* Footer */
          .footer {
            margin-top: 3rem;
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          
          .footer-link {
            color: #1e40af;
            text-decoration: none;
            font-weight: 500;
            margin: 0 1rem;
          }
          
          .footer-link:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }
          
          /* Responsive Design */
          @media (max-width: 768px) {
            .container {
              padding: 1rem;
            }
            
            .header h1 {
              font-size: 2rem;
            }
            
            .header p {
              font-size: 1rem;
            }
            
            th, td {
              padding: 0.75rem 0.5rem;
              font-size: 0.875rem;
            }
            
            .stats {
              grid-template-columns: 1fr;
            }
          }
          
          /* Page Type Icons */
          .page-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 0.5rem;
            vertical-align: middle;
          }
          
          .icon-home { background: linear-gradient(135deg, #f59e0b, #d97706); }
          .icon-content { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
          .icon-contact { background: linear-gradient(135deg, #10b981, #059669); }
          .icon-legal { background: linear-gradient(135deg, #6b7280, #4b5563); }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap</h1>
            <p>805 HVAC Pro - Professional HVAC Services in Thousand Oaks &amp; the 805 Area</p>
          </div>
          
          <div class="stats">
            <div class="stat-card">
              <div class="stat-number"><xsl:value-of select="count(//s:url)"/></div>
              <div class="stat-label">Total Pages</div>
            </div>
            <div class="stat-card">
              <div class="stat-number"><xsl:value-of select="count(//s:url[s:priority='1.0' or s:priority='0.8'])"/></div>
              <div class="stat-label">Main Pages</div>
            </div>
            <div class="stat-card">
              <div class="stat-number"><xsl:value-of select="count(//s:url[s:priority='0.4' or s:priority='0.3'])"/></div>
              <div class="stat-label">Legal Pages</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">2025-08-13</div>
              <div class="stat-label">Last Updated</div>
            </div>
          </div>
          
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Page URL</th>
                  <th>Last Modified</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="//s:url">
                  <xsl:sort select="s:priority" order="descending"/>
                  <tr>
                    <td>
                      <span class="page-icon">
                        <xsl:attribute name="class">
                          page-icon
                          <xsl:choose>
                            <xsl:when test="s:priority='1.0'">icon-home</xsl:when>
                            <xsl:when test="s:priority='0.8'">icon-content</xsl:when>
                            <xsl:when test="s:priority='0.7'">icon-contact</xsl:when>
                            <xsl:otherwise>icon-legal</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                      </span>
                      <a href="{s:loc}" class="url-link">
                        <xsl:value-of select="s:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="last-modified">
                        <xsl:value-of select="s:lastmod"/>
                      </span>
                    </td>
                    <td>
                      <span class="change-freq">
                        <xsl:value-of select="s:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="priority-badge">
                        <xsl:attribute name="class">
                          priority-badge
                          <xsl:choose>
                            <xsl:when test="s:priority='1.0' or s:priority='0.8'">priority-high</xsl:when>
                            <xsl:when test="s:priority='0.7'">priority-medium</xsl:when>
                            <xsl:otherwise>priority-low</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="s:priority"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
          
          <div class="footer">
            <p>This sitemap helps search engines discover and index all pages on our website.</p>
            <div style="margin-top: 1rem;">
              <a href="/" class="footer-link">Home</a>
              <a href="/contact.html" class="footer-link">Contact</a>
              <a href="/services.html" class="footer-link">Services</a>
            </div>
            <p style="margin-top: 1rem; color: #6b7280; font-size: 0.875rem;">
              © 2025 805 HVAC Pro. Professional HVAC Services in Thousand Oaks &amp; the 805 Area.
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>