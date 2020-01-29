$(function () {
  var operacao = "C"; //"C"=Criar
  var selected_index = -1; // Indice do elemento selecionado na lista
  var listaDados = localStorage.getItem("listaDados"); //Retorna os dados armazenados
  listaDados = JSON.parse(listaDados); //Converte String em Object
  if (listaDados === null) // Se não tem dados, inicia um array vazio
    listaDados = [];


  function Create() {
    //Obtem os valores do formulário HTML e transforma em String.
    var dados = JSON.stringify({
      Name: $("#txtName").val(),
      Email: $("#txtEmail").val(),
      Departamento: $("#txtDpto").val(),
      Nivel_de_Acesso: $("#txtNda").val()
    });
    //Adiciona o objeto a Lista
    listaDados.push(dados);
    //Armazene os dados no LocalStorage
    localStorage.setItem("listaDados", JSON.stringify(listaDados));

    return true;
  }

  function Edit() {
    // Editar o item selecionado na tabela
    listaDados[selected_index] = JSON.stringify({
      Name: $("#txtName").val(),
      Email: $("#txtEmail").val(),
      Departamento: $("#txtDpto").val(),
      Nivel_de_Acesso: $("#txtNda").val()
    });
    //Armazena os dados no Local Storage
    localStorage.setItem("listaDados", JSON.stringify(listaDados));

    return true;
  }

  function Delete() {
    //Elimina o elemento selecionado na tabela
    listaDados.splice(selected_index, 1);
    //Atualiza os dados do Local Storage
    localStorage.setItem("listaDados", JSON.stringify(listaDados));

  }

  function List() {
    $("#lista").html("");
    $("#lista").html(

    ); //Adicione a Lista a estrutura HTML
    for (var i in listaDados) {
      var per = JSON.parse(listaDados[i]);
      $("#lista").append("<ul>" +
        "<li>" + "&nbsp&nbsp<strong>" + per.Nivel_de_Acesso +
        ":</strong>&nbsp" + per.Name +
        "<img src='./imgs/delete.png' alt='Delete" + i +
        "' id='btnDelete' class='btnDelete' align='right' /><img src='./imgs/edit.png' alt='Edit" + i +
        "' id='btnEdit' class='btnEdit' align='right'/></li>" +
        "</ul>"
      );
      $(".btnEdit").css("padding", "3px").css("margin-right", "8px");
      $(".btnDelete").css("padding", "3px");

    } //Percorre e agrega os itens na Lista HTML

  }

  $("#frmCadastro").bind("submit", function () {
    if (operacao === "C")
      return Create();
    else
      return Edit();

  }); //Função para decidir se você está adicionando ou editando um item

  List();

  $(".btnEdit").bind("click", function () {
    //Econdendo os botões
    $("#frmCadastro").show();
    $("#btnAdd").hide();
    $("#btnConvite").hide();
    $("#btnOrg").hide();
    operacao = "E"; //"E" = Editar
    //Obtém o identificador do item a ser editado
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Converter de JSON para o formato adaptado para editar os dados
    var per = JSON.parse(listaDados[selected_index]);
    $("#txtName").val(per.Name);
    $("#txtEmail").val(per.Email);
    $("#txtDpto").val(per.Departamento);
    $("#txtName").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtem o identificador do item a ser eliminado
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete(); //Elimina o item
    List(); //Volta a lista dos itens na tabela
    location.reload(); //Atualiza a página
  });

  // Verifica se listaDados no LocalStorage possui dados
  if ((localStorage.getItem("listaDados") === '[]') || (localStorage.getItem("listaDados") === null)) {
    $("#btnAdd").show();
    $("#btnOrg").show();
    $("#btnConvite").hide();
  } else {
    $("#btnOrg").hide();
    $("#btnConvite").show();
    $("#btnOrg").hide();

  };


  //Funções para exibir/ocultar botões 
  $("#btnCancelar").click(function () {
    $("#frmCadastro").hide();
    $("#btnAdd").show();
    $("#btnConvite").show();
    location.reload(); //Atualiza a página
  });

  $("#btnAdd").click(function () {
    $("#btnConvite").hide();
    $("#btnOrg").hide();
    $("#frmCadastro").show();
    $("#btnAdd").hide();
  });



});

