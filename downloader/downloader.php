<?php
//$z - xoom level
for($z=11;$z<=11;$z++)
{
 $d=pow(2,$z);
 echo $d."\n";
 @mkdir('data/'.$z);//prepare directory
 for($x=0;$x<$d;$x++)
 {
   @mkdir('data/'.$z.'/'.$x);//prepare directory
   for($y=0;$y<$d;$y++)
   {
	echo $y."\n";
	$fnn='data/'.$z.'/'.$x.'/'.$y.'.png';//build filename
	if(!file_exists($fnn) || filesize($fnn)==0)//in case i started downloader with same settings, or in case i aborted downloader for current settings
	{
	    $fn=fopen($fnn, 'w');//open file to save data to
	    	//prepare curl request
    	    $ch=curl_init();
    	    //change url prefix
    	    curl_setopt($ch, CURLOPT_URL, 'http://c.tile.stamen.com/toner/'.$z.'/'.$x.'/'.$y.'.png');
    	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//we want to return transfer data into variable
    	    curl_setopt($ch, CURLOPT_FILE, $fn);//save request to file
	    curl_exec($ch);//request the tile
	    curl_close($ch);//close request
	    fclose($fn);//close the file
	}
   }
 }
 
}
?>
