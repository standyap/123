
export class Scrool
{
        

    constructor()
    {
        this.scroolFunction()
        this.topPanel()
        this.leftPanel()
        this.rightPanel()
        
    }
        scroolFunction()
        {
                /**
                 * Left Panel
                 */
                function scrollByDownLeft()
                {
                document.getElementById("left_panel_icon_group").scrollBy(0, -50);
                }
                function scrollByUpLeft()
                {
                document.getElementById("left_panel_icon_group").scrollBy(0, 50);
                }
                document.getElementById("up_icon_left_panel").addEventListener("click", scrollByDownLeft);
                document.getElementById("down_icon_left_panel").addEventListener("click", scrollByUpLeft);
                /**
                 * Right Panel
                 */
                function scrollByDownRight()
                {
                document.getElementById("right_panel_icon_group").scrollBy(0, -50);
                }
                function scrollByUpRight()
                {
                document.getElementById("right_panel_icon_group").scrollBy(0, 50);
                }
                document.getElementById("up_icon_right_panel").addEventListener("click", scrollByDownRight);
                document.getElementById("down_icon_right_panel").addEventListener("click", scrollByUpRight);                               
        }
        topPanel()
        {
                 /**
                 * Subscribe form
                 */
                document.querySelector('.submit-email').addEventListener('mousedown', (e) => 
                {
                        e.preventDefault();
                        document.querySelector('.subscription').classList.add('done');
                });
                /**
                 * Up Down Icons
                 */

                document.getElementById("up_icon_top_panel").addEventListener("click", function () 
                {
                        document.getElementById("top_panel_background").style.top = "-200px";
                        document.getElementById("down_icon_top_panel").style.display = "block";
                        document.getElementById("up_icon_top_panel").style.display = "none";
                }
                )
                document.getElementById("down_icon_top_panel").addEventListener("click", function () 
                {
                        document.getElementById("top_panel_background").style.top = "0px";
                        document.getElementById("up_icon_top_panel").style.display = "block";
                        document.getElementById("down_icon_top_panel").style.display = "none";
                }
                )
        }
        leftPanel()
        {
                /**
                 * Storage Icons
                 */

                document.getElementById("shelves_icon").addEventListener("click", function () 
                {
                        document.createElement("shelves_amount").appendChild("shelves_icon");
                        document.getElementById("shelves_amount").appendChild.document.createTextNode("shelves amount")
                        
                        document.getElementById("shelves_amount").style.top = "50px";  
                        document.getElementById("shelves_amount").style.left = "50px"; 
                                setTimeout(removeHtmlElement, 1000)
                                function removeHtmlElement() 
                                {
                                        document.getElementById("shelves_amount").remove
                                }
                })
                //ADD TAB
                document.getElementById("add_tab").addEventListener("click", function () 
                {
                        document.getElementById("add_tab").style.color = "cyan";
                        document.getElementById("storage_tab").style.color = "white";
                        document.getElementById("left_panel_icon_group_main").style.display = "block";
                        document.getElementById("left_panel_icon_group_storage").style.display = "none";
                })
                 //STORAGE TAB
                 document.getElementById("storage_tab").addEventListener("click", function () 
                 {
                        document.getElementById("storage_tab").style.color = "cyan";
                        document.getElementById("add_tab").style.color = "white";
                        document.getElementById("left_panel_icon_group_main").style.display = "none";
                        document.getElementById("left_panel_icon_group_storage").style.display = "block";
                 })
        }



        rightPanel()
        {
                /**
                 * Carpet Icons
                 */

                //CARPET TAB
                document.getElementById("carpet_tab").addEventListener("click", function () 
                {
                        document.getElementById("carpet_tab").style.color = "#7CFC00";
                        document.getElementById("parquet_tab").style.color = "white";
                        document.getElementById("laminate_tab").style.color = "white";
                        document.getElementById("right_panel_icon_group_carpet").style.display = "block";
                        document.getElementById("right_panel_icon_group_parquet").style.display = "none";
                        document.getElementById("right_panel_icon_group_laminate").style.display = "none";
                })
                 //PARQUET TAB
                 document.getElementById("parquet_tab").addEventListener("click", function () 
                 {
                        document.getElementById("parquet_tab").style.color = "#7CFC00";
                        document.getElementById("carpet_tab").style.color = "white";
                        document.getElementById("laminate_tab").style.color = "white";
                        document.getElementById("right_panel_icon_group_parquet").style.display = "block";
                        document.getElementById("right_panel_icon_group_carpet").style.display = "none";
                        document.getElementById("right_panel_icon_group_laminate").style.display = "none";
                 })

                  //LAMINATE TAB
                  document.getElementById("laminate_tab").addEventListener("click", function () 
                  {
                        document.getElementById("laminate_tab").style.color = "#7CFC00";
                        document.getElementById("carpet_tab").style.color = "white";
                        document.getElementById("parquet_tab").style.color = "white";
                        document.getElementById("right_panel_icon_group_laminate").style.display = "block";
                        document.getElementById("right_panel_icon_group_parquet").style.display = "none";
                        document.getElementById("right_panel_icon_group_carpet").style.display = "none";  
                  })
        }
}        

