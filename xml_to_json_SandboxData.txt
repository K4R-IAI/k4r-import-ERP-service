<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
 <xsl:output omit-xml-declaration="yes" indent="yes"/>
<xsl:param name="hundred" select="100"/>
<xsl:output method="html" indent="yes"/>
<xsl:template match="/WBBDLD07/IDOC">
<xsl:variable name="alpha" select="'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
<xsl:variable name="quote">"</xsl:variable>
{
"products":[ 	
		<xsl:for-each select="E1WBB01">      	
{
		<xsl:variable name="price" >
     	 <xsl:apply-templates select="E1WBB03/E1WBB07/E1WBB08/KWERT"/>
    	</xsl:variable>
    	<xsl:variable name="gtinEAN" >
     	 <xsl:apply-templates select="E1WBB03/E1WBB04/EAN11"/>
    	</xsl:variable>
			"gtin":<xsl:value-of select="$quote"/><xsl:value-of select="$gtinEAN"/><xsl:value-of select="$quote"/>,
				<xsl:for-each select="E1WBB03">  
					"length":<xsl:value-of select="$quote"/><xsl:value-of select="floor(LAENG)"> </xsl:value-of><xsl:value-of select="$quote"/>,
					"depth":<xsl:value-of select="$quote"/><xsl:value-of select="floor(BREIT)">  </xsl:value-of><xsl:value-of select="$quote"/>,
					"height":<xsl:value-of select="$quote"/><xsl:value-of select="floor(HOEHE)"> </xsl:value-of><xsl:value-of select="$quote"/>
				<xsl:for-each select="E1WBB04"> 
				
			</xsl:for-each>
			
			
			<xsl:for-each select="E1WBB07"> 
				<xsl:for-each select="E1WBB08"> 
				</xsl:for-each>
	        </xsl:for-each>
        </xsl:for-each>
        <xsl:for-each select="E1WBB02"> 
		</xsl:for-each>
		
		<xsl:for-each select="E1WBB09">
		</xsl:for-each>
		
		<xsl:for-each select="E1WBB10">
		,"name":<xsl:value-of select="$quote"/><xsl:value-of select="MAKTM"/><xsl:value-of select="$quote"/>
		</xsl:for-each>
		
		<xsl:for-each select="E1WBB12">
		</xsl:for-each>
		
		<xsl:for-each select="E1WBB16"> 
		</xsl:for-each>
		
		<xsl:for-each select="E1WBB18"> 
		,"LAYGR":<xsl:value-of select="$quote"/><xsl:value-of select="LAYGR"/><xsl:value-of select="$quote"/>,
		"SORF1":<xsl:value-of select="$quote"/><xsl:value-of select="SORF1"/><xsl:value-of select="$quote"/>,
		"LAYVR":<xsl:value-of select="$quote"/><xsl:value-of select="LAYVR"/><xsl:value-of select="$quote"/>,
		"MELAY":<xsl:value-of select="$quote"/><xsl:value-of select="MELAY"/><xsl:value-of select="$quote"/>,
		"SHELF":<xsl:value-of select="$quote"/><xsl:value-of select="SHELF"/><xsl:value-of select="$quote"/>,
		"FACIN":<xsl:value-of select="$quote"/><xsl:value-of select="FACIN"/><xsl:value-of select="$quote"/>,
		"LMVER":<xsl:value-of select="$quote"/><xsl:value-of select="LMVER"/><xsl:value-of select="$quote"/>
			<xsl:for-each select="E1WBB18_EXT"> 
			,"FRONT":<xsl:value-of select="$quote"/><xsl:value-of select="FRONT"/><xsl:value-of select="$quote"/>,
			"VERAB":<xsl:value-of select="$quote"/><xsl:value-of select="VERAB"/><xsl:value-of select="$quote"/>,
			"VERBI":<xsl:value-of select="$quote"/><xsl:value-of select="VERBI"/><xsl:value-of select="$quote"/>,
			"MAXB":<xsl:value-of select="$quote"/><xsl:value-of select="MAXB"/><xsl:value-of select="$quote"/>,
			"PRABE":<xsl:value-of select="$quote"/><xsl:value-of select="PRABE"/><xsl:value-of select="$quote"/>
			</xsl:for-each>
		</xsl:for-each>
		
		<xsl:for-each select="E1WBB22"> 
		</xsl:for-each>
		
		<xsl:for-each select="E1WBBAH">
		</xsl:for-each>
		}
 		<xsl:if test="position() != last()"> 		         		<xsl:text>,</xsl:text>        </xsl:if> 
</xsl:for-each>	
]
}
</xsl:template>
</xsl:stylesheet>




